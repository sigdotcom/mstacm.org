"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let RecipeInput = class RecipeInput {
};
tslib_1.__decorate([
    src_1.Field()
], RecipeInput.prototype, "title", void 0);
tslib_1.__decorate([
    src_1.Field({ nullable: true })
], RecipeInput.prototype, "description", void 0);
RecipeInput = tslib_1.__decorate([
    src_1.InputType()
], RecipeInput);
exports.RecipeInput = RecipeInput;
//# sourceMappingURL=recipe-input.js.map