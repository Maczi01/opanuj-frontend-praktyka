<script lang="ts">
  import { fetchWeather } from '../lib/LocationFetcher';
  import { LocationWeather } from '../models/LocationWeather';
  import WeatherPreview from './WeatherPreview.svelte';

  let weather: LocationWeather;
  let error = false;
  async function onLocationChange(event: KeyboardEvent) {
    const locationQuery = (event.target as HTMLInputElement).value;
    error = false;
    try {
      const result = await fetchWeather(locationQuery);
      if (result) {
        weather = result;
      }
    } catch {
      console.error(`Failed to fetch weather for ${locationQuery}`);
      error = true
    }
  }
</script>

<main>
  <div class="bg-white rounded-xl p-4 shadow-lg">
    <div class="text-center">
      <h1 class="text-2xl py-4 text-center">🌞 Hello, Weather! 🌦️</h1>
      <p>
        <span class="text-xs bg-blue-400 p-2 rounded-md text-white"
          >Weather in EU!</span
        >
        <span class="text-xs bg-red-400 p-2 rounded-md text-white"
          >NEW: Weather in US!</span
        >
      </p>
    </div>
    <input
      type="text"
      class="mt-4 p-4 border border-gray-200 w-full rounded-xl"
      placeholder="Location"
      on:keyup={onLocationChange}
    />
  </div>
  <div>
    {#if weather && !error}
      <WeatherPreview {weather} />
    {/if}
    {#if error}
      <p class="text-red-500">Location not found. Please try again.</p>
    {/if}
  </div>
</main>
