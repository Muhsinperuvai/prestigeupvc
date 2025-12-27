import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext
import subprocess
import threading
import os
import webbrowser
import time

dev_process = None
project_path = r"E:\PrestigeUPvcDoors\prestigeupvc"

browser_opened = False
DEV_URL = "http://localhost:3000/admin/login"  # change if needed

# ---------------- LOGGING ----------------
def log(text):
    output_box.insert(tk.END, text + "\n")
    output_box.see(tk.END)

def run_command(cmd):
    try:
        process = subprocess.Popen(
            cmd,
            cwd=project_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=True,
            text=True
        )
        for line in process.stdout:
            log(line.strip())
        for line in process.stderr:
            log(line.strip())
    except Exception as e:
        log(str(e))

# ---------------- DEV SERVER ----------------
def start_dev():
    global dev_process, browser_opened

    if dev_process:
        messagebox.showinfo("Info", "Dev server already running")
        return

    browser_opened = False
    log("Starting npm run dev...")

    dev_process = subprocess.Popen(
        "npm run dev",
        cwd=project_path,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    threading.Thread(target=stream_dev_logs, daemon=True).start()
    threading.Thread(target=open_browser_after_delay, daemon=True).start()

def stream_dev_logs():
    global dev_process
    for line in dev_process.stdout:
        log(line.strip())

def open_browser_after_delay():
    global browser_opened
    time.sleep(5)  # wait for dev server to start
    if not browser_opened:
        log(f"Opening browser: {DEV_URL}")
        webbrowser.open(DEV_URL)
        browser_opened = True

def stop_dev():
    global dev_process
    if not dev_process:
        messagebox.showinfo("Info", "Dev server is not running")
        return

    log("Stopping dev server...")
    dev_process.terminate()
    dev_process = None

# ---------------- GIT ----------------
def git_all():
    msg = commit_entry.get()
    if not msg:
        messagebox.showwarning("Warning", "Commit message required")
        return

    def task():
        log("Git add .")
        run_command("git add .")
        log(f'Git commit: "{msg}"')
        run_command(f'git commit -m "{msg}"')
        log("Git push")
        run_command("git push")

    threading.Thread(target=task, daemon=True).start()

# ---------------- PROJECT PATH ----------------
def choose_project():
    global project_path
    path = filedialog.askdirectory()
    if path:
        project_path = path
        path_label.config(text=f"Project: {project_path}")
        log(f"Project set to: {project_path}")

# ---------------- GUI ----------------
root = tk.Tk()
root.title("Project Control Panel")
root.geometry("900x560")
root.configure(bg="#1e1e1e")

path_label = tk.Label(
    root,
    text=f"Project: {project_path}",
    bg="#1e1e1e",
    fg="lightgray"
)
path_label.pack(pady=5)



btn_frame = tk.Frame(root, bg="#1e1e1e")
btn_frame.pack(pady=10)

tk.Button(btn_frame, text="Start Dev", width=15, command=start_dev).grid(row=0, column=0, padx=5)
tk.Button(btn_frame, text="Stop Dev", width=15, command=stop_dev).grid(row=0, column=1, padx=5)
tk.Button(btn_frame, text="Git Add + Commit + Push", width=25, command=git_all).grid(row=0, column=2, padx=5)

commit_frame = tk.Frame(root, bg="#1e1e1e")
commit_frame.pack(pady=5)

tk.Label(commit_frame, text="Commit Message:", bg="#1e1e1e", fg="white").pack(side=tk.LEFT)
commit_entry = tk.Entry(commit_frame, width=45)
commit_entry.pack(side=tk.LEFT, padx=5)
commit_entry.insert(0, "code push")

output_box = scrolledtext.ScrolledText(
    root,
    width=110,
    height=22,
    bg="#121212",
    fg="#00ff9c",
    insertbackground="white"
)
output_box.pack(pady=10)

tk.Button(root, text="Clear Logs", command=lambda: output_box.delete(1.0, tk.END)).pack()

root.mainloop()
