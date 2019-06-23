"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../src");
const typeorm_1 = require("typeorm");
const recipe_1 = require("./recipe");
let User = class User {
};
tslib_1.__decorate([
    src_1.Field(type => src_1.ID),
    typeorm_1.PrimaryGeneratedColumn()
], User.prototype, "id", void 0);
tslib_1.__decorate([
    src_1.Field(),
    typeorm_1.Column()
], User.prototype, "email", void 0);
tslib_1.__decorate([
    src_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true })
], User.prototype, "nickname", void 0);
tslib_1.__decorate([
    typeorm_1.Column()
], User.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => recipe_1.Recipe, recipe => recipe.author, { lazy: true }),
    src_1.Field(type => [recipe_1.Recipe])
], User.prototype, "recipes", void 0);
User = tslib_1.__decorate([
    src_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=user.js.map