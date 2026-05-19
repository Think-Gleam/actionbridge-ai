import { processInput } from './src/services/orchestrator.js';

async function testAll() {
  console.log("=== TEST 1: LAHORE ===");
  const res1 = await processInput("Orders in Lahore dropped by 25% this month. Delivery complaints increased, and customer satisfaction is falling.");
  console.log("Scenario:", res1.scenario);
  console.log("Provider:", res1.provider_used);

  console.log("\n=== TEST 2: FUEL ===");
  const res2 = await processInput("Fuel prices increased by 15% this week. Delivery partners are warning that transport costs may rise next week, affecting checkout pricing and customer satisfaction.");
  console.log("Scenario:", res2.scenario);
  console.log("Provider:", res2.provider_used);

  console.log("\n=== TEST 3: RAIN ===");
  const res3 = await processInput("Due to heavy rainfall, G-10 and G-11 are facing water accumulation. Citizens are advised to avoid unnecessary travel.");
  console.log("Scenario:", res3.scenario);
  console.log("Provider:", res3.provider_used);

  console.log("\n=== TEST 4: CUSTOM ===");
  const res4 = await processInput("Customer complaints increased in Karachi after late deliveries during Eid week. Repeat orders are falling and support tickets are taking longer to resolve.");
  console.log("Scenario:", res4.scenario);
  console.log("Provider:", res4.provider_used);
}

testAll();
