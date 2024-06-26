import { Field, ObjectType } from '@nestjs/graphql';
import { Fridge } from 'src/apis/fridges/entities/fridges.entity';
import { UsersImage } from 'src/apis/usersImages/entities/usersImage.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  nickname: string;

  @JoinColumn()
  @OneToOne(() => UsersImage, usersImage => usersImage.id)
  @Field(() => UsersImage, {nullable: true})
  usersimage: UsersImage;

  @Column()
  @Field(() => String)
  phone: string;

  @CreateDateColumn()
  @Field(() => Date)
  regDate: Date;

  @DeleteDateColumn()
  @Field(() => String)
  deletedAt: Date;
}
