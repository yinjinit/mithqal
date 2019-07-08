import { ok, notFound, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

// URL looks like: https://www.mithqal.io/_functions/customer/{token}
export function get_customer(request) {
  let options = {
    "headers": {
      "Content-Type": "application/json"
    }
  };

  // query a collection to find matching items
  return wixData.query("BEP2_Verificiations")
    .eq("_id", request.path[0])
    .find()
    .then((results) => {
      // matching items were found
      if (results.items.length > 0) {
        options.body = {
          "items": results.items
        };
        return ok(options);
      }

      // no matching items found
      options.body = {
        "error": `token:${request.path[0]} wasn't found`
      };

      return notFound(options);
    })
    .catch((error) => {
      options.body = {
        "error": error
      };

      return serverError(options);
    });
}