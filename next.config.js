module.exports = {
    async rewrites() {
        return [
            // Rewrite everything to `pages/index`
            {
                source: "/:any*",
                destination: "/"
            }
        ];
    }
}