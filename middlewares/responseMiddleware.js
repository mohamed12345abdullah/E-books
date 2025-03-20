function responseMiddleware(req, res, next) {
    // Save the original `json` method
    const originalJson = res.json;

    res.json = function (body) {
        const status = res.statusCode;
        const isError = status >= 400;
        const timestamp = new Date().toISOString();

        // Pretty log the request details
        console.log("\n=================== Request Details ===================");
        console.log(`Timestamp: ${timestamp}`);
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.originalUrl}`);
        console.log("Headers:", JSON.stringify(req.headers, null, 2));
        console.log("Body:", JSON.stringify(req.body, null, 2));

        // Pretty log the response details
        console.log("\n=================== Response Details ==================");
        console.log(`Status Code: ${status}`);

        // Extract and format errors
        let errors = [];
        if (body.errors) {
            errors = Array.isArray(body.errors) ? body.errors : [body.errors];
        } else if (body.error) {
            errors = [{ msg: body.error }];
        }

        if (errors.length > 0) {
            console.log("\n=================== Errors ============================");
            console.log(JSON.stringify(errors, null, 2));
        }

        // Construct the final response
        const response = {
            status: isError ? "error" : "success",
            message: body.message || (isError ? "An error occurred" : "Request successful"),
            data: isError ? null : body.data || {},
            errors: isError && errors.length > 0 ? errors.map(err => ({
                type: err.type || null,
                value: err.value || null,
                msg: err.msg || "Unknown error",
                path: err.path || null,
                location: err.location || null
            })) : [],
            timestamp,
        };

        // Pretty log the final response
        console.log("\n=================== Final Response =====================");
        console.log(JSON.stringify(response, null, 2));

        // Send the formatted response
        return originalJson.call(this, response);
    };

    next();
}

module.exports = responseMiddleware;
