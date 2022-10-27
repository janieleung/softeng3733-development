export function adjust(model, delta){
    if(!model.available(delta)){
        return model;
    }

    model.adjust(delta);
    return model.copy();
}