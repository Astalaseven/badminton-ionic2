import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { Set, StorageService } from '../../providers/storage-service';


@Component({
  templateUrl: 'play.html'
})
export class PlayPage {
  @ViewChild(Content) content: Content;

  saved_states: Array<{
    set_no: number, set_end: boolean, game_end: boolean,
    left_point: number, right_point: number, sets: any[]
  }>;

  set_no: number;
  set_end: boolean;
  game_end: boolean;

  left_point: number;
  right_point: number;

  sets: any[];

  constructor(public storageService: StorageService) {

    this.saved_states = [];

    this.set_no = 1;
    this.set_end = false;
    this.game_end = false;

    this.left_point = 0;
    this.right_point = 0;

    this.sets = [];
  }

  public newSet() {

    if (this.set_no < 3) {

      this.set_no += 1;
      this.set_end = false;

      this.resetPoints();
    } else {

      this.game_end = true;
    }
  }

  private resetPoints() {

    this.left_point = 0;
    this.right_point = 0;
  }

  public resetSet() {

    this.saveState();

    this.set_end = false;

    this.resetPoints();
  }

  public resetAll() {

    this.saveState();

    this.set_no = 1;
    this.set_end = false;
    this.game_end = false;

    this.resetPoints();

    this.sets = [];
  }

  public leftScored() {

    this.saveState();

    if (!this.checkFinished()) {

      this.left_point += 1;

      if (this.checkFinished())
        this.setWon();
    }
  }

  public rightScored() {

    this.saveState();

    if (!this.checkFinished()) {

      this.right_point += 1;

      if (this.checkFinished())
        this.setWon();
    }
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

    let max = Math.max(this.left_point, this.right_point);
    let min = Math.min(this.left_point, this.right_point);

    let diff: number = (max - min);
    let twoPointLead: boolean = (diff >= 2);

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

    if (this.canUndo()) {

      this.restoreState();
    }
  }

  public canUndo(): boolean {

    return this.saved_states && this.saved_states.length > 0;
  }

  private saveState() {

    if (this.saved_states.length === 10)
      this.saved_states.shift();

    this.saved_states.push(
      {
        sets: this.clone(this.sets),
        set_no: this.set_no,
        set_end: this.set_end,
        game_end: this.game_end,
        left_point: this.left_point,
        right_point: this.right_point
      }
    );
  }

  private restoreState() {

    if (this.saved_states) {

      if (this.game_end) {

        this.storageService.undoSaveHistoric();
      }

      let state = this.saved_states.pop();

      this.sets = state.sets;
      this.set_no = state.set_no;
      this.set_end = state.set_end;
      this.game_end = state.game_end;
      this.left_point = state.left_point;
      this.right_point = state.right_point;
    }
  }

  private clone(sets: Set[]): Set[] {

    let setsCopy: Set[] = [];

    sets.forEach(
      set => {
        setsCopy.push({ left: set.left, right: set.right });
      }
    )

    return setsCopy;
  }
}
