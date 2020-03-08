interface Attribute {
    key: string, 
    value: string, 
}

export interface Tag {
    name: string, 
    children: Tag[] | string, 
    attributes: Attribute[]
}

/**
 * Serialze the tag-data structure 
 * to a string. 
 */
export const serialize = (tag: Tag): string => {
    
    const content = (typeof(tag.children) === "string")? 
        tag.children: 
        tag.children.map(child => serialize(child))

    const attributes = tag.attributes
        .map(attribute => `${attribute.key}="${attribute.value}"`)
        .join(" ");

    //TODO: make more readable 
    return `<${tag.name}${attributes.length > 0? ` ${attributes}`: ``}>${content}</${tag.name}>`
}