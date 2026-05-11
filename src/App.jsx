import { Component, useState, useEffect, useMemo} from "react";

function Intro(){
  return(
    <div style={{background:"blue", padding:"10px", borderRadius:"5px", color:"white"}}>
      <h2>What is useMemo?</h2>
      <p>useMemo is a React Hook used to memoize (cache) the result of a computation.</p>
      <strong>It only recomputes the value when one of its dependencies changes.</strong>
      <h2>Why we use useMemo</h2>
      <p>To improve performance by preventing expensive calculations from running unnecessarily.</p>
      <h2>Syntax</h2>
       <strong>{"const memoizedValue = useMemo(() => computeFunction(), [dependencies]);"}</strong><br/>
       <p>useMemo = remembers values</p>
    </div>
  )
}

// Counter using Memo:----------------------------------------------------------------------------------

function ExpensiveCalculation(){
  const[count, setCount] = useState(0);
  const[toggle,setToggle] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [expensiveValue, setExpensiveValue] = useState(0);

  const calculateExpensiveValue   = useMemo(()=>{
   
     let total = 0;
     for(let i = 0; i<10000; i++){
      total += i;
     }
  
     return total;
  },[]);

  useEffect(() =>{
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setExpensiveValue(calculateExpensiveValue + count);
      setIsCalculating(false);
    }, 1000); // simulate delay

    return () => clearTimeout(timer);
  },[count, calculateExpensiveValue])

  const containerStyle = {
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "Arial, sans-serif",
  };
  const buttonGroup = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  };
  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const toggleStyle = {
    ...buttonStyle,
    backgroundColor: toggle ? "#16a34a" : "#dc2626", // green / red
    color: "white",
  };

  // eslint-disable-next-line no-unused-vars
  const calcBox = {
    marginTop: "20px",
    background: "#f1f5f9",
    padding: "15px",
    display: "inline-block",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return(
    <div style={containerStyle}>
      <h1>⚙️ Expensive Calculation Demo</h1>

      <h2 style={{ color: "#333" }}>
        {isCalculating ? "⏳ Calculating..." : `Expensive Value: ${expensiveValue}`}
      </h2>

      
        <h3>Count: {count}</h3>
      

     <div style={buttonGroup}>
      <button
          style={{ ...buttonStyle, background: "#3b82f6", color: "white" }}
          onClick={() => setCount(count + 1)}
        >
          ➕ Increment
        </button>

        <button
          style={{ ...buttonStyle, background: "#f97316", color: "white" }}
          onClick={() => setCount(count - 1)}
          disabled={count === 0}
        >
          ➖ Decrement
        </button>

         <button
          style={{ ...buttonStyle, background: "#6b7280", color: "white" }}
          onClick={() => setCount(0)}
        >
          🔁 Reset
        </button>
     </div>

      <div style={{ marginTop: "25px" }}>
        <button style={toggleStyle} onClick={() => setToggle(!toggle)}>
          {toggle ? "Toggle: ON" : "Toggle: OFF"}
        </button>
      </div>
    </div>
  )
}

// 2. Search Filter using useMemo:------------------------------------------------------------------------------

function SearchFilter(){
  const[search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const users = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Helen",
    "Isaac",
    "Jack",
  ];

  useEffect(()=>{
  const handler = setTimeout(()=>{
    setDebouncedSearch(search);
  },5000);
  return () => { clearTimeout(handler)}
  },[search]);

  const filterUser = useMemo(()=>{
    return users.filter((user) => user.toLowerCase().includes(search.toLowerCase()))
  },[search])

  return(
    <div style={{ textAlign: "center", marginTop: "60px" }}>
        <h2>🔍 Efficient Search Filter</h2>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
          width: "250px",
          marginBottom: "20px",
        }} />
        
        
         <ul style={{ listStyle: "none", padding: 0 }}>
          {
            filterUser.map((user)=>(
              <li key={user.id} style={{
              background: "#f3f4f6",
              margin: "5px auto",
              width: "200px",
              padding: "8px",
              borderRadius: "6px",
            }}>{user}</li>
            ))
          }
         </ul>
    </div>
  )
}

// 3. Calculation Based on Dependency:-------------------------------------------------

function DependencyDemo(){
  const[a,setA] = useState(5);
  const[b,setB] = useState(10);

  const sum = useMemo(()=>{
   return a + b;
  },[a,b]);

  const btn = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    margin:"10px 10px"
  };

  return(
    <div style= {{textAlign: "center", marginTop: "60px" }}>
      <button style={btn} > Value of A : {a}</button>
      <button style={btn} > Value of B : {b}</button>
      <h2>Sum:{sum}</h2>
      <button style={btn} onClick={()=> setA(a+1)}>Increment A</button>
      <button style={btn} onClick={() => setB(b+1)}>Increment B</button>
    </div>
  )
}

const projects = [
  {
    category: "Basic",
    items: [
      {id:1, name: "Introduction", Component: <Intro />},
      {id:2, name: "CounterMemo", Component: <ExpensiveCalculation />},
      {id:3, name: "SearchFilter", Component: <SearchFilter />},
      {id:4, name: "AddCounter", Component: <DependencyDemo />},
    ],
  },
  {
    category: "Intermediate",
    items: [

    ],
  },
  {
    category: "Advanced",
    items: [
      
    ],
  },
];


export default function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive handling for hamburger
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "250px",
    background: "#6200ea",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "fixed",
    left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
    top: 0,
    bottom: 0,
    overflowY: "auto",
    transition: "left 0.3s ease",
    zIndex: 2000,
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    left: 20,
    background: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 2500,
    display: isMobile ? "block" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: isMobile && isSidebarOpen ? "block" : "none",
    zIndex: 1500,
  };

  const contentStyle = {
    flex: 1,
    marginLeft: isMobile ? "0" : "250px",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "margin-left 0.3s ease",
    background: "#ffffffff",
    minHeight: "80vh",
    minWidth:"70vw"
  };

  const menuBtn = (isActive) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: isActive ? "#fff" : "#3700b3",
    color: isActive ? "#000" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  });

  const allItems = projects.flatMap((p) => p.items);
  const active = allItems.find((p) => p.id === activeProject)?.Component;

  return (
    <>
      <div style={overlayStyle} onClick={toggleSidebar}></div>
      <button style={hamburgerStyle} onClick={toggleSidebar}>
        ☰
      </button>

      <aside style={sidebarStyle}>
        <h2 style={{ textAlign: "center" }}>📂 useMemo Projects</h2>
        {projects.map((group) => (
          <div key={group.category}>
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {group.category}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                style={menuBtn(activeProject === item.id)}
                onClick={() => {
                  setActiveProject(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={contentStyle}>{active}</main>
    </>
  );
}
