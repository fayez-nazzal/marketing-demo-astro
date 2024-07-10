import { useEffect, useState } from "preact/hooks";

const JSComponentVisible = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);
  
  return (
    <div class="bg-base-content/5 p-5 rounded-lg h-max w-max flex flex-col gap-2"> 
      <h2 class="mt-0">Hey! I'm component 3</h2>
      <p>I have JavaScript .... But I'm fast!</p>
      <p class="text-lg text-error font-bold">{count} seconds have passed since you saw me!</p>
      <p>My JavaScript will be loaded once you see me!</p>
    </div>
  );
};

export default JSComponentVisible;
