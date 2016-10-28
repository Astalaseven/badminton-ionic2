import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { StorageService } from '../../providers/storage-service';

@Component({
  templateUrl: 'play.html'
})
export class PlayPage {
  @ViewChild(Content) content: Content;

  show_menu: boolean;
  undo_callback: any;

  set_no: number;
  set_end: boolean;
  game_end: boolean;

  left_point: number;
  right_point: number;

  sets: any[];

  constructor(public storageService: StorageService) {

    // this.resetAll();
    this.show_menu = false;

    this.set_no = 1;
    this.set_end = false;
    this.game_end = false;

    this.left_point = 0;
    this.right_point = 0;

    this.sets = [];

    this.undo_callback = null;
  }

  public newSet() {

    if (this.set_no < 3) {
      this.set_no += 1;
      this.set_end = false;

      this.resetPoints();
    } else {
      this.game_end = true;
    }

    this.undo_callback = null;
  }

  private resetPoints() {

    this.left_point = 0;
    this.right_point = 0;
  }

  public resetSet() {

    this.set_end = false;

    this.resetPoints();

    this.undo_callback = null;
  }

  public resetAll() {

    this.set_no = 1;
    this.set_end = false;
    this.game_end = false;

    this.resetPoints();

    this.sets = [];

    this.undo_callback = null;
  }

  public leftScored() {

    if (!this.checkFinished()) {
      this.left_point += 1;

      if (this.checkFinished())
        this.setWon();
    }

    this.undo_callback = this.undoLeftScored;
  }

  public undoLeftScored() {
    console.log('undo left');
    if (this.set_end)
      this.storageService.undoSaveHistoric();

    this.left_point -= 1;
    this.set_end = false;
    this.sets.pop();
    
    this.undo_callback = null;
  }

  public rightScored() {

    if (!this.checkFinished()) {
      this.right_point += 1;

      if (this.checkFinished())
        this.setWon();
    }

    this.undo_callback = this.undoRightScored;
  }

  public undoRightScored() {
    console.log('undo right');

    if (this.set_end)
      this.storageService.undoSaveHistoric();

    this.right_point -= 1;
    this.set_end = false;
    this.sets.pop();
    
    this.undo_callback = null;
  }

  private setWon() {

    this.sets.push(
      {
        left: this.left_point,
        right: this.right_point
      }
    );

    if (this.set_no === 3) {
      this.game_end = true;
      this.storageService.saveHistoric(this.sets);
    }
  }

  public checkFinished(): boolean {

    this.set_end = this.isSetFinished();

    return this.set_end;
  }

  private isSetFinished(): boolean {

    let diff: number = Math.abs(this.left_point - this.right_point);
    let twoPointLead: boolean = (diff >= 2);

    let max = Math.max(this.left_point, this.right_point);
    let min = Math.min(this.left_point, this.right_point);

    // first to 30 wins
    if (max === 30) {

      return true;
    }

    // when each one has 20 point, needs 2 points lead to win
    if (min >= 20 && twoPointLead) {

      return true;
    }

    // first one to 21 wins
    if (max === 21 && twoPointLead) {

      return true;
    }

    return false;
  }

  public undo() {
    if (this.undo_callback) {
      console.log('undo');
      this.undo_callback();
    }
  }

  public toggleMenu() {
    this.show_menu = !this.show_menu;
    this.content.resize();
  }
}
