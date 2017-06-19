"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = require("./socket");
var rxjs_1 = require("rxjs");
var ulid = require("ulid");
function testAuthentication(io, key) {
    return socket_1.rpc(io, 'authentication', {
        request: 'testkey',
        key: key
    }).then(function (v) {
        return v.auth;
    });
}
exports.testAuthentication = testAuthentication;
function authenticate(io) {
    var nonce = ulid();
    var subj = new rxjs_1.Subject();
    io.once(nonce, function (result) {
        if (result.status === 'success') {
            subj.next({
                token: result.token,
                response: 'token',
                result: 'success'
            });
            subj.complete();
        }
        else {
            subj.error(result);
        }
    });
    socket_1.rpc(io, 'authentication', {
        request: 'startauth',
        nonce: nonce
    }).then(function (r) {
        subj.next(r);
    });
    return subj.asObservable();
}
exports.authenticate = authenticate;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2NrZXQvYXV0aGVudGljYXRpb24uY2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUErQjtBQU0vQiw2QkFBMkM7QUFDM0MsMkJBQTZCO0FBRTdCLDRCQUNFLEVBQXlCLEVBQ3pCLEdBQVc7SUFFWCxNQUFNLENBQUMsWUFBRyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRTtRQUMvQixPQUFPLEVBQUUsU0FBUztRQUNsQixHQUFHLEVBQUUsR0FBRztLQUNULENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFlO1FBQ3RCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVZELGdEQVVDO0FBRUQsc0JBQ0UsRUFBeUI7SUFFekIsSUFBTSxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDckIsSUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFPLEVBQWlDLENBQUM7SUFDMUQsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQSxNQUFNO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztnQkFDbkIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxTQUFTO2FBQ2xCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILFlBQUcsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUU7UUFDeEIsT0FBTyxFQUFFLFdBQVc7UUFDcEIsS0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBZ0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBeEJELG9DQXdCQyIsImZpbGUiOiJzb2NrZXQvYXV0aGVudGljYXRpb24uY2hhbm5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNvY2tldElPIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgcnBjIH0gZnJvbSAnLi9zb2NrZXQnO1xuaW1wb3J0IHtcbiAgVGVzdFJlc3BvbnNlLFxuICBTdGFydFJlc3BvbnNlLFxuICBUb2tlblJlc3BvbnNlXG59IGZyb20gJy4vbWVzc2FnZUludGVyZmFjZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgdWxpZCBmcm9tICd1bGlkJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3RBdXRoZW50aWNhdGlvbihcbiAgaW86IFNvY2tldElPQ2xpZW50LlNvY2tldCxcbiAga2V5OiBzdHJpbmdcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gcnBjKGlvLCAnYXV0aGVudGljYXRpb24nLCB7XG4gICAgcmVxdWVzdDogJ3Rlc3RrZXknLFxuICAgIGtleToga2V5XG4gIH0pLnRoZW4oKHY6IFRlc3RSZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiB2LmF1dGg7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0aGVudGljYXRlKFxuICBpbzogU29ja2V0SU9DbGllbnQuU29ja2V0XG4pOiBPYnNlcnZhYmxlPFRva2VuUmVzcG9uc2UgfCBTdGFydFJlc3BvbnNlPiB7XG4gIGNvbnN0IG5vbmNlID0gdWxpZCgpO1xuICBjb25zdCBzdWJqID0gbmV3IFN1YmplY3Q8VG9rZW5SZXNwb25zZSB8IFN0YXJ0UmVzcG9uc2U+KCk7XG4gIGlvLm9uY2Uobm9uY2UsIHJlc3VsdCA9PiB7XG4gICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgc3Viai5uZXh0KHtcbiAgICAgICAgdG9rZW46IHJlc3VsdC50b2tlbixcbiAgICAgICAgcmVzcG9uc2U6ICd0b2tlbicsXG4gICAgICAgIHJlc3VsdDogJ3N1Y2Nlc3MnXG4gICAgICB9KTtcbiAgICAgIHN1YmouY29tcGxldGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Viai5lcnJvcihyZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJwYyhpbywgJ2F1dGhlbnRpY2F0aW9uJywge1xuICAgIHJlcXVlc3Q6ICdzdGFydGF1dGgnLFxuICAgIG5vbmNlOiBub25jZVxuICB9KS50aGVuKChyOiBTdGFydFJlc3BvbnNlKSA9PiB7XG4gICAgc3Viai5uZXh0KHIpO1xuICB9KTtcbiAgcmV0dXJuIHN1YmouYXNPYnNlcnZhYmxlKCk7XG59XG4iXX0=
