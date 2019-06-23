"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../src");
const typeorm_1 = require("typeorm");
const rate_1 = require("./rate");
const user_1 = require("./user");
let Recipe = class Recipe {
};
tslib_1.__decorate([
    src_1.Field(type => src_1.ID),
    typeorm_1.PrimaryGeneratedColumn()
], Recipe.prototype, "id", void 0);
tslib_1.__decorate([
    src_1.Field(),
    typeorm_1.Column()
], Recipe.prototype, "title", void 0);
tslib_1.__decorate([
    src_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true })
], Recipe.prototype, "description", void 0);
tslib_1.__decorate([
    src_1.Field(type => [rate_1.Rate]),
    typeorm_1.OneToMany(type => rate_1.Rate, rate => rate.recipe, { lazy: true, cascade: ["insert"] })
], Recipe.prototype, "ratings", void 0);
tslib_1.__decorate([
    src_1.Field(type => user_1.User),
    typeorm_1.ManyToOne(type => user_1.User, { lazy: true })
], Recipe.prototype, "author", void 0);
Recipe = tslib_1.__decorate([
    typeorm_1.Entity(),
    src_1.ObjectType()
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.js.map