import { useEffect, useState } from "preact/hooks";

const JSComponent = () => {

  const onThemeChange = () => {
    // change data-theme on document body
    document.body.setAttribute("data-theme", document.body.getAttribute("data-theme") === "aqua" ? "dark" : "aqua");
  };

  const onScrollBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  
  return (
    <div class="bg-base-content/10 p-5 rounded-lg h-max w-max flex flex-col gap-2"> 
      <h2 class="mt-0">Hey! I'm component 2</h2>
      <div>I have JavaScript .... But I'm also fast 🔥!</div>
      <button class="mt-5 btn btn-primary" onClick={onThemeChange}>Change theme</button>
      <p class="w-64">My JavaScript will be loaded on client only, without delaying page load</p>
      <button class="btn btn-secondary mt-0 font-bold text-lg mt-2" onClick={onScrollBottom}>Scroll to see component 3</button>
    </div>
  );
};

export default JSComponent;
