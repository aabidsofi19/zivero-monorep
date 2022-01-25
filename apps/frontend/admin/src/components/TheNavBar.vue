<script setup></script>

<template>
  <nav
    class="w-full shadow-sm bg-background border-b-2 border-gray-300 fixed p-3 z-50 flex justify-between px-4 items-center"
  >
    <p class="text-white uppercase text-lg">Zivero Admin</p>

    <div class="w-1/3">
      <input
        id="rounded-email"
        type="text"
        class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        placeholder="search"
      />
    </div>

    <div class="text-lg hover:rounded-md hp">
      <span class="bg-accent rounded-full py-1 px-2">A</span>
      <span class="mx-2 text-white">Aabid</span>
    </div>
  </nav>
</template>
