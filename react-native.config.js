module.exports = {
  dependency: {
    platforms: {
      // disable Android platform, other platforms will still autolink if provided
      // https://github.com/react-native-community/cli/blob/main/docs/autolinking.md#how-can-i-customize-how-autolinking-works-for-my-package
      android: null,
    },
  },
};
