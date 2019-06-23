"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const recipe_1 = require("./entities/recipe");
const rate_1 = require("./entities/rate");
const user_1 = require("./entities/user");
function seedDatabase() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const recipeRepository = typeorm_1.getRepository(recipe_1.Recipe);
        const ratingsRepository = typeorm_1.getRepository(rate_1.Rate);
        const userRepository = typeorm_1.getRepository(user_1.User);
        const defaultUser = userRepository.create({
            email: "test@github.com",
            nickname: "19majkel94",
            password: "s3cr3tp4ssw0rd",
        });
        yield userRepository.save(defaultUser);
        const [recipe1, recipe2] = recipeRepository.create([
            {
                title: "Recipe 1",
                description: "Desc 1",
                author: defaultUser,
            },
            {
                title: "Recipe 2",
                author: defaultUser,
            },
        ]);
        yield recipeRepository.save([recipe1, recipe2]);
        const ratings = ratingsRepository.create([
            { value: 2, user: defaultUser, recipe: recipe1 },
            { value: 4, user: defaultUser, recipe: recipe1 },
            { value: 5, user: defaultUser, recipe: recipe1 },
            { value: 3, user: defaultUser, recipe: recipe1 },
            { value: 4, user: defaultUser, recipe: recipe1 },
            { value: 2, user: defaultUser, recipe: recipe2 },
            { value: 4, user: defaultUser, recipe: recipe2 },
        ]);
        yield ratingsRepository.save(ratings);
        return {
            defaultUser,
        };
    });
}
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=helpers.js.map