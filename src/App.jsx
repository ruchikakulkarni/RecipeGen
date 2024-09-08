import { useState } from "react";
import "./App.css";

// HomePage Component
const HomePage = ({ onStartClick }) => (
  <div className="min-h-screen bg-[#f5ead9] flex flex-col">
    {/* Top Header */}
    <header className="w-full py-6 bg-[#d42a24] text-white flex justify-center shadow-md sticky top-0">
      <h1 className="text-2xl font-bold tracking-wider">GenRecipe</h1>
    </header>

    {/* Main Content */}
    <div className="flex flex-col md:flex-row items-center justify-center flex-grow mx-auto px-6">
      {/* Left Section: Text */}
      <div className="text-section text-center md:text-left md:w-1/2 flex flex-col items-center md:items-start justify-center">
        <h2 className="text-5xl font-bold text-[#d42a24] mb-4">Recipe Generator</h2>
        <p className="text-xl text-[#6b5241] mb-8">
        Explore recipes that match your ingredients, preferences and cravings.
        </p>
        <button
          onClick={onStartClick}
          className="bg-[#d42a24] text-white px-8 py-4 rounded-full text-lg hover:bg-[#c12720]"
        >
          Start
        </button>
      </div>

      {/* Right Section: Image */}
      <div className="image-section mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img 
          src="https://i.pinimg.com/564x/3c/bc/76/3cbc7698dae8b2f6a8089c6aa73c1061.jpg"
          alt="Recipe Illustration"
          className="w-[600px] h-auto"
        />
      </div>
    </div>
  </div>
);

// Recipe Generator Component
const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [recipeInstructions, setRecipeInstructions] = useState("");

  const availableIngredients = ["Eggs", "Bread", "Milk", "Oil", "Tomatoes"];

  const recipeData = {
    "bread,eggs": {
      name: "Egg Toast",
      instructions: "1. Beat the eggs in a bowl.\n2. Heat a pan with some oil.\n3. Dip the bread slices into the egg mixture and fry them until golden brown on both sides."
    },
    "eggs,oil": {
      name: "Fried Eggs",
      instructions: "1. Heat oil in a pan.\n2. Crack the eggs into the pan and cook until the whites are set.\n3. Serve hot with salt and pepper."
    },
    "bread,tomatoes": {
      name: "Tomato Sandwich",
      instructions: "1. Slice the tomatoes.\n2. Spread butter or mayonnaise on the bread.\n3. Place the tomato slices on the bread and season with salt and pepper. Serve as a cold or grilled sandwich."
    },
    "bread,milk": {
      name: "Milk Toast",
      instructions: "1. Heat milk in a saucepan.\n2. Toast the bread slices.\n3. Pour the warm milk over the toast and sprinkle with sugar or cinnamon."
    },
    "eggs,milk": {
      name: "Scrambled Eggs",
      instructions: "1. Beat eggs and milk together in a bowl.\n2. Heat butter in a pan and pour the egg mixture in.\n3. Stir continuously until the eggs are fully cooked."
    },
    "bread,eggs,milk": {
      name: "French Toast",
      instructions: "1. Whisk eggs, milk, and cinnamon together.\n2. Dip the bread slices into the mixture.\n3. Fry the bread in a pan until both sides are golden brown. Serve with syrup."
    }
  };

  const handleAddIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient.toLowerCase())) {
      setIngredients([...ingredients, ingredient.toLowerCase()]);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToRemove));
  };

  const handleGenerateRecipe = () => {
    if (ingredients.length === 0) {
      setGeneratedRecipe("Please add some ingredients first.");
      setShowRecipeDetails(false);
      return;
    }

    const sortedIngredients = [...ingredients].sort().join(",");

    if (recipeData[sortedIngredients]) {
      setGeneratedRecipe(`Recipe Suggestion: ${recipeData[sortedIngredients].name}`);
      setRecipeInstructions(recipeData[sortedIngredients].instructions);
      setShowRecipeDetails(true); // Show the recipe details
    } else {
      setGeneratedRecipe("No specific recipe found for this combination, but try experimenting!");
      setShowRecipeDetails(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7e8d3] to-[#fff] flex flex-col items-center relative">
      {/* Header */}
      <header className="w-full py-6 bg-[#d42a24] text-white flex justify-center shadow-md sticky top-0">
        <h1 className="text-2xl font-bold tracking-wider">GenRecipe</h1>
      </header>

      {/* Recipe Generator Section */}
      <div className="w-full max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg flex flex-col md:flex-row justify-between">
        {/* Left Side: Ingredients */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-6 text-[#333]">Select Ingredients:</h2>

          {/* Ingredient Selection Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {availableIngredients.map((ingredient, index) => (
              <button
                key={index}
                onClick={() => handleAddIngredient(ingredient)}
                className="bg-[#d42a24] text-white px-4 py-2 rounded-full hover:bg-[#a1201d] transition duration-300"
              >
                {ingredient}
              </button>
            ))}
          </div>

          {/* Selected Ingredients */}
          <div className="flex flex-wrap mt-4 space-x-2 space-y-2">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
                <span className="text-gray-700 capitalize">{ingredient}</span>
                <button
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Generate Recipe Button */}
          <button
            onClick={handleGenerateRecipe}
            className="bg-[#000000] text-white px-6 py-3 rounded-full mt-8 hover:bg-[#a1201d] transition duration-300"
          >
            Generate Recipe
          </button>

          {/* Generated Recipe Display */}
          {generatedRecipe && (
            <div className="mt-6 p-4 bg-gray-100 text-gray-800 rounded-lg w-full text-center">
              {generatedRecipe}
            </div>
          )}
        </div>

        {/* Right Side: Recipe Instructions */}
        {showRecipeDetails && (
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg mt-6 md:mt-0 md:ml-6">
            <h2 className="text-xl font-semibold text-[#d42a24]">Recipe Instructions</h2>
            <pre className="mt-4 text-gray-700 whitespace-pre-wrap">{recipeInstructions}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

// App Component
const App = () => {
  const [isRecipePage, setIsRecipePage] = useState(false);

  const handleStartClick = () => {
    setIsRecipePage(true);  // Navigate to the Recipe Generator page
  };

  return (
    <div>
      {isRecipePage ? <RecipeGenerator /> : <HomePage onStartClick={handleStartClick} />}
    </div>
  );
};

export default App;
