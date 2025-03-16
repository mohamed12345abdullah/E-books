function responseMiddleware(req, res, next) {
    // Save the original `json` method
    const originalJson = res.json;

    res.json = function (body) {
        const status = res.statusCode;
        const isError = status >= 400;

        // Pretty log the request information
        console.log("\n=================== Request Details ===================");
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.originalUrl}`);
        console.log("Headers:", JSON.stringify(req.headers, null, 2));
        console.log("Body:", JSON.stringify(req.body, null, 2));

        // Pretty log the response information
        console.log("\n=================== Response Details ==================");
        console.log(`Status Code: ${status}`);

        // Pretty log the response body
        console.log("\n=================== Response Body =====================");
        console.log(JSON.stringify(body, null, 2));

        // Extract errors if present
        const errors = Array.isArray(body.errors) && body.errors.length > 0 ? body.errors : [];

        if (errors.length > 0) {
            console.log("\n=================== Errors ============================");
            console.log(JSON.stringify(errors, null, 2));
        }

        // Format the final response
        const response = {
            status: isError ? 'error' : 'success',
            message: body.message || (isError ? 'An error occurred' : 'Request successful'),
            data: isError ? null : body.data || body,
            errors: isError && errors.length > 0
                ? {
                    type: errors[0]?.type || null,
                    value: errors[0]?.value || null,
                    msg: errors[0]?.msg || null,
                    path: errors[0]?.path || null,
                    location: errors[0]?.location || null,
                }
                : [],
        };

        // Send the formatted response
        return originalJson.call(this, response);
    };

    next();
}


module.exports = responseMiddleware;
