"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null
  return theme == 'light' ? 
  <button className="fixed p-1 right-6 top-6 z-50 rounded-full bg-default border-2 border-slate-400" onClick={()=>setTheme('dark')}><MdOutlineWbSunny className="w-6 h-6"/></button> :
  <button className="fixed p-1 right-6 top-6 z-50 rounded-full bg-default border-2 border-zinc-700" onClick={()=>setTheme('light')}><FaRegMoon className="w-6 h-6"/></button>

};