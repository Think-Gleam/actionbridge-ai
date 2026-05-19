import { processInput } from './src/services/orchestrator.js';

async function test() {
    console.log("Testing with Lahore mock input...");
    const res1 = await processInput("Orders in Lahore dropped by 25% this month.");
    console.log("Lahore result scenario:", res1.scenario);

    console.log("\nTesting with custom input...");
    const res2 = await processInput("The new York branch saw a 15% increase in foot traffic but a drop in total revenue. People are buying cheaper items.");
    console.log("Custom result scenario:", res2.scenario);
}

test();
