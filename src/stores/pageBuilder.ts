import { defineStore } from 'pinia'
import { componentRegistry } from './componentRegistry'

export interface BlockInstance {
  id: string;        // component id
  key: string;       // unique key for instance
  tokens: any;       // component tokens
}

interface PageState {
  blocks: BlockInstance[];
  selectedIdx: number;
}

const LS_KEY = 'tbuilder:v2:page';

function makeKey(){ return Math.random().toString(36).slice(2); }

export const usePageBuilderStore = defineStore('pageBuilder', {
  state: (): PageState => ({
    blocks: [],
    selectedIdx: -1,
  }),
  actions: {
    load(){
      try{
        const raw = localStorage.getItem(LS_KEY);
        if(raw){
          const data = JSON.parse(raw);
          this.blocks = Array.isArray(data.blocks) ? data.blocks : [];
          this.selectedIdx = typeof data.selectedIdx==='number' ? data.selectedIdx : -1;
        }
      }catch{ /* ignore */ }
    },
    save(){
      localStorage.setItem(LS_KEY, JSON.stringify({ blocks: this.blocks, selectedIdx: this.selectedIdx }));
    },
    addBlock(componentId: string){
      const def = componentRegistry.find(c=>c.id===componentId);
      if(!def) return;
      this.blocks.push({ id: componentId, key: makeKey(), tokens: { ...def.defaults } });
      this.selectedIdx = this.blocks.length - 1;
      this.save();
    },
    removeBlock(i: number){
      this.blocks.splice(i,1);
      if(this.selectedIdx>=this.blocks.length) this.selectedIdx = this.blocks.length-1;
      this.save();
    },
    moveUp(i:number){
      if(i>0){ const [b] = this.blocks.splice(i,1); this.blocks.splice(i-1,0,b); this.selectedIdx=i-1; this.save(); }
    },
    moveDown(i:number){
      if(i<this.blocks.length-1){ const [b] = this.blocks.splice(i,1); this.blocks.splice(i+1,0,b); this.selectedIdx=i+1; this.save(); }
    },
    duplicate(i:number){
      const b = this.blocks[i]; if(!b) return;
      this.blocks.splice(i+1,0,{ id: b.id, key: makeKey(), tokens: JSON.parse(JSON.stringify(b.tokens)) });
      this.selectedIdx = i+1;
      this.save();
    },
    select(i:number){ this.selectedIdx = i; this.save(); },
    setTokens(i:number, tokens:any){ if(this.blocks[i]){ this.blocks[i].tokens = tokens; this.save(); } }
  }
});
