
export interface Attribute {
    key: string, 
    value: string, 
}

export interface Tag {
    name: string, 
    children: Tag[] | string, 
    attributes: Attribute[]
}


const get_content = (tag: Tag) => {
    
    return (typeof(tag.children) === "string")? 
        tag.children: 
        tag.children
            .map(child => serialize(child))
            .join("")
}

const format_attributes = (tag: Tag) => tag.attributes
    .map(attribute => `${attribute.key}="${attribute.value}"`)
    .join(" ");


/**
 * Serialze the tag-data structure 
 * to a string. 
 */
export const serialize = (tag: Tag): string => {
    
    const content = get_content(tag);
    const attributes = format_attributes(tag);

    //TODO: make more readable 
    return `<${tag.name}${attributes.length > 0? ` ${attributes}`: ``}>${content}</${tag.name}>`
}