import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {Field, ObjectType} from 'type-graphql-v2-fork';

@ObjectType()
export class Profile {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    userId: string;

    @Field()
    @Column()
    displayName: string;
    
    @Field()
    @Column()
    fullName: string;
}