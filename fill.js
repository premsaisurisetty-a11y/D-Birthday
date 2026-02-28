const url = 'https://dbday-6c2ca-default-rtdb.firebaseio.com/wishes.json';

const sampleWishes = [
  {
    name: "Aisha",
    message: "Happy Birthday Delisha! Hope you have the most beautiful day filled with love and joy! 🌟🥂",
    emoji: "💌"
  },
  {
    name: "Rahul",
    message: "Wishing you a very happy birthday! May all your dreams come true this year! 🎉🎂",
    emoji: "💌"
  },
  {
    name: "Sneha",
    message: "Happy Birthday! You are such an amazing friend, hope your day is as special as you are! 💖✨",
    emoji: "💌"
  }
];

async function fillDb() {
  for (const wish of sampleWishes) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wish)
    });
    console.log(`Added wish from ${wish.name}: ${res.status}`);
  }
  console.log("Database filled successfully!");
}

fillDb().catch(console.error);
