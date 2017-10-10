// tslint:disable
/**
 * @copyright Angular ng-bootstrap team
 */
beforeEach(function () {
    jasmine.addMatchers({
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot) {
                return function (actual, className) {
                    var orNot = isNot ? 'not ' : '';
                    return {
                        pass: actual.classList.contains(className) === !isNot,
                        message: "Expected " + actual.outerHTML + " " + orNot + " to contain the CSS class \"" + className + "\""
                    };
                };
            }
        }
    });
});
//# sourceMappingURL=matchers.js.map