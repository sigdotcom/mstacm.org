"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../src/");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const recipe_1 = require("../entities/recipe");
const rate_1 = require("../entities/rate");
let RecipeResolver = class RecipeResolver {
    constructor(recipeRepository, ratingsRepository) {
        this.recipeRepository = recipeRepository;
        this.ratingsRepository = ratingsRepository;
    }
    recipe(recipeId) {
        return this.recipeRepository.findOne(recipeId);
    }
    recipes() {
        return this.recipeRepository.find();
    }
    addRecipe(recipeInput, { user }) {
        const recipe = this.recipeRepository.create(Object.assign({}, recipeInput, { author: user }));
        return this.recipeRepository.save(recipe);
    }
    rate({ user }, rateInput) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const recipe = yield this.recipeRepository.findOne(rateInput.recipeId, {
                relations: ["ratings"],
            });
            if (!recipe) {
                throw new Error("Invalid recipe ID");
            }
            (yield recipe.ratings).push(this.ratingsRepository.create({
                recipe,
                user,
                value: rateInput.value,
            }));
            return yield this.recipeRepository.save(recipe);
        });
    }
};
tslib_1.__decorate([
    src_1.Query(returns => recipe_1.Recipe, { nullable: true }),
    tslib_1.__param(0, src_1.Arg("recipeId", type => src_1.Int))
], RecipeResolver.prototype, "recipe", null);
tslib_1.__decorate([
    src_1.Query(returns => [recipe_1.Recipe])
], RecipeResolver.prototype, "recipes", null);
tslib_1.__decorate([
    src_1.Mutation(returns => recipe_1.Recipe),
    tslib_1.__param(0, src_1.Arg("recipe")), tslib_1.__param(1, src_1.Ctx())
], RecipeResolver.prototype, "addRecipe", null);
tslib_1.__decorate([
    src_1.Mutation(returns => recipe_1.Recipe),
    tslib_1.__param(0, src_1.Ctx()), tslib_1.__param(1, src_1.Arg("rate"))
], RecipeResolver.prototype, "rate", null);
RecipeResolver = tslib_1.__decorate([
    src_1.Resolver(recipe_1.Recipe),
    tslib_1.__param(0, typeorm_typedi_extensions_1.InjectRepository(recipe_1.Recipe)),
    tslib_1.__param(1, typeorm_typedi_extensions_1.InjectRepository(rate_1.Rate))
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
//# sourceMappingURL=recipe-resolver.js.map