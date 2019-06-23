"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const recipe_1 = require("./recipe");
const user_1 = require("./user");
let Rate = class Rate {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Rate.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    typeorm_1.Column({ type: "int" })
], Rate.prototype, "value", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => user_1.User),
    typeorm_1.ManyToOne(type => user_1.User, { lazy: true })
], Rate.prototype, "user", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn()
], Rate.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => recipe_1.Recipe, { lazy: true })
], Rate.prototype, "recipe", void 0);
Rate = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Rate);
exports.Rate = Rate;
//# sourceMappingURL=rate.js.map