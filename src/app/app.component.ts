import {Component} from '@angular/core';
import { Data } from './data.model';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import DataFromFile from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
@Injectable()
export class AppComponent {
  private textareaValue: string = '';
  private saveIndex: any;
  private dataArray = new Array<Data>();
  private newData: Data = new Data();
  private data: any = new Data();
  private dataKeys: Array<string>;
  private dataFromFile: object = DataFromFile;
  private parsingComplete: boolean = false;
  private parsingError: boolean = false;

  parseData(parseData): any {
    return JSON.parse(parseData);
  }
  loadData(parseData) {
    try {
      this.dataArray = this.parseData(parseData);
      this.dataKeys = this.getKeys(this.dataArray);
      this.parsingComplete = true;
      this.parsingError = false;
    } catch (e) {
      console.info('could not parse JSON' + e);
      this.parsingError = true;
      this.parsingComplete = false;
    }
  }
  loadDataFromFile(loadData, textArea){
    this.dataArray = loadData;
    textArea.value = JSON.stringify(this.dataArray);
    this.dataKeys = this.getKeys(this.dataArray);
    this.parsingComplete = true;
    this.parsingError = false;
  }
  stringifyJSON(textArea) {
    textArea.value = JSON.stringify(this.dataArray);
  }
  getData(): object {
    return this.dataArray;
  }
  getKeys(obj: object): Array<string> {
    return Object.keys(obj[0]);
  }
  deleteData(index){
    this.dataArray.splice(index,1);
  }
  addData(inputName: string, inputYear: string) {
    this.dataArray.push(this.newData);
    this.newData = {};
  }
  editData(index) {
    this.saveIndex = index;
    this.data = Object.create(this.dataArray[this.saveIndex]);
    console.log(this.data);
  }
  saveChanges() {
    console.log(this.data);
    Object.assign(this.dataArray[this.saveIndex], this.data);
    this.data = {};
  }
  closeEdit() {
    this.data = {};
  }

}
