/**
 * @fileoverview Rule to disallow the use of moment.js
 * @author SiggiAtliG
 */
"use strict";

module.exports = {
  rules: {
    "no-moment": {
      meta: {
        type: "suggestion",
        docs: {
          description: "disallow the use of moment.js",
          category: "Best Practices",
          recommended: true,
        },
        messages: {
          noMoment: "Use date-fns or Temporal instead of moment.js",
        },
      },
      create: function (context) {
        return {
          ImportDeclaration(node) {
            if (node.source.value === "moment") {
              context.report({
                node,
                messageId: "noMoment",
              });
            }
          },
          CallExpression(node) {
            if (
              node.callee.name === "require" &&
              node.arguments.length > 0 &&
              node.arguments[0].type === "Literal" &&
              node.arguments[0].value === "moment"
            ) {
              context.report({
                node,
                messageId: "noMoment",
              });
            }
          },
        };
      },
    },
  },
  configs: {
    recommended: {
      plugins: ["no-moment"],
      rules: {
        "no-moment/no-moment": "error",
      },
    },
  },
}; 