<script module lang="ts">
  import CodeBlock from "#lib/components/CodeBlock.svelte";
  import type { GlobalNoteMetadata } from "#lib/content/global-notes.ts";

  export const metadata: GlobalNoteMetadata = {
    title: "Qwen3 0.6b vs Swift Strings",
    date: "12/11/25",
  };
</script>

<CodeBlock code={`

Difference: …

       """
    <think>
    Okay, the user is asking about how to make a pizza. I need to break down the steps in a clear way. First, they might be looking for a simple recipe. Let me start by outlining the basic ingredients: dough, toppings, cheese, sauce. Then list each step in order—prepping the dough first for a good texture.
   
    Wait, but some people prefer a different approach. Maybe start with mixing ingredients instead of just preparing dough? Or is there something specific they want in terms of steps? The user hasn't specified preferences, so I should keep it general but structured.
   
    I should mention key points like kneading the dough properly before adding toppings. Also, ensuring the sauce is well mixed and combined with cheese properly. Maybe add tips on storage if they're making it ahead of time.
   
    Is there anything else I should include that's common in pizza-making? Like optional variations or checking for any mistakes to avoid—like not using the right sauce or mixing too much cheese. That would make it a complete guide.
    </think>
   
    Here’s a step-by-step guide to making a classic pizza:
   
    ### **Ingredients:**
    - 1 cup all-purpose flour
    - 1/4 cup water
    - 2 cups milk (or almond milk)
    - 1 egg (for mixing)
    - Salt and pepper (as needed)
   
    ---
   
    ### **Steps:**
   
    #### **Step 1: Prepare the Dough**
    Mix all dry ingredients together in a bowl. Add wet ingredients slowly to avoid lumps—mix until you get a smooth dough.
   
    #### **Step 2: Knead the Dough**
    Knead for about *3 minutes* until it becomes elastic, tender, and has a good texture. If it’s too flat or dry, add more water or milk as needed.
   
    #### **Step 3: Roll Out (Optional)**
    If making pizza dough ahead of time:
    - Let rest for *1 hour*, then roll out on an unshaken surface (like parchment paper) with your hands or machine to achieve even thickness.
   
    ---
   
    ### **Step 4: Add Toppings**
    - Spread cheese evenly over the rolled-out dough.
    - Top with fresh tomato sauce, cheese slices, pepperoni slices (if using), mushrooms, onions if added before mixing the sauce.
   
    ### **Step 5: Mix Sauce and Cheese**
    If you want a tangy base:
    1. In a bowl, mix together tomato sauce and cheese until combined.
    2. Use this mixture to cover the toppings.
   
    ---
   
    ### **Step 6: Bake**
    Place in preheated oven at *375°F* (190°C). Bake for *8–10 minutes*, then flip or serve immediately.
   
    ---
   
    ### **Tips:**
    - Store leftovers in an air-tight container for up to *4 days*.
    - If making pizza dough ahead of time, store it in the fridge for less than 2 hours before rolling out again.
   
  − Enjoy your homemade pizza! ���
  + Enjoy your homemade pizza! 🍕
    """

(First: −, Second: +)
`} />
<p>— {metadata.date}</p>
