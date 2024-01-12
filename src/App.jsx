import NoteList from "./components/NoteList";
import Sidebar from "./components/Sidebar";
import SideNotes from "./components/SideNotes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayedNote from "./components/DisplayedNote";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="min-h-screen bg-slate-800 flex">
      <BrowserRouter>
        <Sidebar />
        <SideNotes />

        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/note/:id" element={<DisplayedNote />} />  
          <Route path="/editer" element={<Edit />} />  
          <Route path="/editer/:id" element={<Edit />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
