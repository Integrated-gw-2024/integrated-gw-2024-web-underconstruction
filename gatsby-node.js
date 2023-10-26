exports.onCreateWebpackConfig = ({ actions, rules }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.xml$/i,
                    use: ["xml-loader"],
                },
            ],
        },
    });
};