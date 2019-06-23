"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let RateInput = class RateInput {
};
tslib_1.__decorate([
    src_1.Field(type => src_1.ID)
], RateInput.prototype, "recipeId", void 0);
tslib_1.__decorate([
    src_1.Field(type => src_1.Int)
], RateInput.prototype, "value", void 0);
RateInput = tslib_1.__decorate([
    src_1.InputType()
], RateInput);
exports.RateInput = RateInput;
//# sourceMappingURL=rate-input.js.map