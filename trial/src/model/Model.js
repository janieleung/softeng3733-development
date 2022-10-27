export default class Model{
    /** Construct a Model with given information (in this case a value) */
    constructor(minValue, value, maxValue){
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
    
    /**
     * Check if the model is available for change
     * @param {*} delta 
     * @returns whether the change is out of bound
     */
    available(delta){
        if (this.value + delta < this.minValue) { return false; }
        if (this.value + delta > this.maxValue) { return false; }
        return true;
    }

    /**
     * Adjust the model based on a given delta
     * @param {*} delta 
     */
    adjust(delta){
        if (this.available(delta)) {    // Check if the availability of the change
            this.value += delta;
        }
    }

    /**
     * Critical Ability
     * Create a new Model on demand from the existing one, to trigger canvas update
     * @returns 
     */
    copy(){
        let m = new Model(this.minValue, this.value, this.maxValue);
        return m;
    }


}

