module.exports = function(api) {
    api.cache(true);

    return {
        exclude: /node_modules/,
        include: ["src"],
        presets: [
            "@babel/preset-react",
            [
                "@babel/preset-env",
                {
                    targets: {
                        browsers: [
                            "last 1 firefox major versions",
                            "last 1 chrome major versions",
                            "last 1 safari major versions",
                        ],
                    },
                    corejs: "2",
                    debug: true,
                    modules: 'commonjs',
                    useBuiltIns: false,
                },
            ],
        ],
        env: {
            test: {
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: {
                                node: "12.0.0",
                            },
                        },
                    ],
                ],
            },
        },
    };
};
