const mockProducts = [
  {
    id: 1,
    title: "Pepperoni Pizza",
    category: "Pizza",
    price: 8.99,
    rating: 4.5,
    distance: 1.2,
    description:
      "A classic pepperoni pizza topped with generous slices of spicy pepperoni, gooey mozzarella cheese, and our signature tomato sauce. Perfectly baked for a crispy crust and rich flavor. Ideal for meat lovers looking for a satisfying meal.",
    image: require("../assets/images/food/1.avif"),
  },
  {
    id: 2,
    title: "Cheeseburger Deluxe",
    category: "Burger",
    price: 7.49,
    rating: 4.3,
    distance: 0.8,
    description:
      "A juicy cheeseburger with melted cheddar cheese, fresh lettuce, tomato slices, and our special sauce on a toasted bun. Perfect for a quick and tasty meal any time of the day.",
    image: require("../assets/images/food/2.avif"),
  },
  {
    id: 3,
    title: "French Fries",
    category: "Dessert",
    price: 2.99,
    rating: 4.2,
    distance: 1.5,
    description:
      "Golden and crispy French fries, lightly salted and served hot. The perfect side dish to complement any burger or sandwich in our menu.",
    image: require("../assets/images/food/3.avif"),
  },
  {
    id: 4,
    title: "Grilled Chicken Sandwich",
    category: "Burger",
    price: 6.5,
    rating: 4.6,
    distance: 2.1,
    description:
      "Tender grilled chicken breast served on a toasted bun with fresh lettuce, tomato, and mayo. A healthy and delicious sandwich option.",
    image: require("../assets/images/food/4.avif"),
  },
  {
    id: 5,
    title: "Caesar Salad",
    category: "Salad",
    price: 6.75,
    rating: 4.4,
    distance: 1.8,
    description:
      "Fresh romaine lettuce tossed with Caesar dressing, croutons, and grated parmesan cheese. A light and tasty option for a healthier choice.",
    image: require("../assets/images/food/5.avif"),
  },
  {
    id: 6,
    title: "BBQ Chicken Wings",
    category: "Sandwich",
    price: 7.95,
    rating: 4.7,
    distance: 1.3,
    description:
      "Tender chicken wings glazed with smoky BBQ sauce, served hot and ready to enjoy. A perfect starter or snack for wing lovers.",
    image: require("../assets/images/food/6.avif"),
  },
  {
    id: 7,
    title: "Vanilla Milkshake",
    category: "Sandwich",
    price: 3.49,
    rating: 4.1,
    distance: 0.9,
    description:
      "Creamy vanilla milkshake made with real vanilla ice cream and topped with whipped cream. A sweet treat to finish your meal.",
    image: require("../assets/images/food/7.avif"),
  },
  {
    id: 8,
    title: "Margarita Pizza",
    category: "Pizza",
    price: 7.99,
    rating: 4.8,
    distance: 1.0,
    description:
      "Classic Margarita pizza with fresh tomatoes, mozzarella cheese, basil leaves, and a touch of olive oil baked to perfection.",
    image: require("../assets/images/food/8.avif"),
  },
  {
    id: 9,
    title: "Chicken Nuggets",
    category: "Sandwich",
    price: 4.25,
    rating: 4.0,
    distance: 1.4,
    description:
      "Crispy golden chicken nuggets served with your choice of dipping sauces. Perfect as a snack or Sandwich.",
    image: require("../assets/images/food/9.avif"),
  },
  {
    id: 10,
    title: "Chocolate Sundae",
    category: "Dessert",
    price: 3.75,
    rating: 4.3,
    distance: 2.3,
    description:
      "Decadent chocolate sundae topped with chocolate syrup, nuts, and whipped cream. A delightful dessert to satisfy your sweet tooth.",
    image: require("../assets/images/food/10.avif"),
  },
  {
    id: 11,
    title: "Spicy Chicken Burger",
    category: "Burger",
    price: 6.99,
    rating: 4.5,
    distance: 1.6,
    description:
      "A spicy chicken burger with crispy fried chicken fillet, lettuce, tomato, and spicy mayo sauce in a toasted bun.",
    image: require("../assets/images/food/11.avif"),
  },
  {
    id: 12,
    title: "Onion Rings",
    category: "Dessert",
    price: 3.25,
    rating: 4.2,
    distance: 1.1,
    description:
      "Crunchy onion rings battered and fried to a golden brown. A tasty side dish to accompany any meal.",
    image: require("../assets/images/food/12.avif"),
  },
  {
    id: 13,
    title: "Iced Tea",
    category: "Dessert",
    price: 1.99,
    rating: 3.9,
    distance: 0.7,
    description:
      "Refreshing iced tea brewed fresh and served chilled. A perfect drink for hot days.",
    image: require("../assets/images/food/13.avif"),
  },
  {
    id: 14,
    title: "Fish Sandwich",
    category: "Burger",
    price: 5.99,
    rating: 4.1,
    distance: 2.0,
    description:
      "Breaded fish fillet sandwich with lettuce, tomato, and tartar sauce on a soft bun. A seafood favorite.",
    image: require("../assets/images/food/14.avif"),
  },
  {
    id: 15,
    title: "Mozzarella Sticks",
    category: "Sandwich",
    price: 4.5,
    rating: 4.4,
    distance: 1.7,
    description:
      "Cheesy mozzarella sticks breaded and fried to golden perfection. Served with marinara sauce for dipping.",
    image: require("../assets/images/food/15.avif"),
  },
  {
    id: 16,
    title: "Grilled Chicken Wrap",
    category: "Sandwich",
    price: 6.25,
    rating: 4.3,
    distance: 1.9,
    description:
      "A delicious grilled chicken wrap with fresh veggies and a tangy sauce wrapped in a soft tortilla.",
    image: require("../assets/images/food/16.avif"),
  },
  {
    id: 17,
    title: "Taco Trio",
    category: "Burger",
    price: 6.75,
    rating: 4.6,
    distance: 2.2,
    description:
      "Three soft tacos filled with seasoned meat, lettuce, cheese, and salsa. Perfect for sharing or a quick meal.",
    image: require("../assets/images/food/17.avif"),
  },
  {
    id: 18,
    title: "Strawberry Smoothie",
    category: "Dessert",
    price: 3.99,
    rating: 4.2,
    distance: 1.3,
    description:
      "A refreshing strawberry smoothie made with fresh strawberries and yogurt. A healthy and tasty beverage.",
    image: require("../assets/images/food/18.avif"),
  },
  {
    id: 19,
    title: "Bacon Cheeseburger",
    category: "Burger",
    price: 8.25,
    rating: 4.7,
    distance: 1.4,
    description:
      "A bacon cheeseburger featuring crispy bacon, melted cheese, lettuce, and tomato on a toasted bun. A hearty favorite.",
    image: require("../assets/images/food/19.avif"),
  },
  {
    id: 20,
    title: "Chocolate Chip Cookies",
    category: "Dessert",
    price: 3.25,
    rating: 4.5,
    distance: 2.4,
    description:
      "Freshly baked chocolate chip cookies with a gooey center and crispy edges. A perfect sweet snack or dessert.",
    image: require("../assets/images/food/20.avif"),
  },
];

export default mockProducts;
