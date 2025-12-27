import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TodoItem {
  id: number;
  text: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  newTaskText = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'medium';
  todoItems: TodoItem[] = [];
  nextId = 1;

  addTask() {
    if (this.newTaskText.trim()) {
      this.todoItems.push({
        id: this.nextId++,
        text: this.newTaskText,
        priority: this.selectedPriority,
        completed: false
      });
      this.newTaskText = '';
    }
  }

  removeTask(id: number) {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }

  toggleCompleted(id: number) {
    const item = this.todoItems.find(item => item.id === id);
    if (item) {
      item.completed = !item.completed;
    }
  }

  getPriorityClass(priority: 'low' | 'medium' | 'high'): string {
    return `priority-${priority}`;
  }
}