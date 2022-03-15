from promise import is_thenable
import json
import logging

class DebugMiddleware(object):
    def on_error(self, error):
        

    def resolve(self, next, root, info, **args):
        result = next(root, info, **args)
        if is_thenable(result):
            result.catch(self.on_error)

        return result
        

class GraphqlErrorLogMiddleware(object):
    """
    Logs errors for invalid graphql queries
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        try:
            if (
                400 >= response.status_code
                and response.status_code != 403
                and "graphql" in request.path.lower()
            ):
                response_json = json.loads(response.content)

                if "errors" in response_json:
                    log_response(
                        message=f"Graphql Error: {response_json['errors']}",
                        response=response,
                        level="error",
                    )
        except Exception as e:
            logging.debug(f"Error logging Graphql Error: {e}")

        return response        