// Libraries
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

// Enums
import { RolesEnum } from '@/enum';

// Entities
import { UsersEntity } from '.';

@Entity({ name: 'credentials' })
export class CredentialsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 255,
    })
    password: string;

    @Column({
        type: 'timestamp with time zone',
        name: 'last_login_at',
    })
    lastLoginAt: Date;

    @Column({
        type: 'enum',
        enum: RolesEnum,
        default: RolesEnum.USER,
    })
    rol: RolesEnum;

    @Column({
        type: 'timestamp with time zone',
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column({
        type: 'timestamp with time zone',
        name: 'updated_at',
        default: () => 'now()',
    })
    updatedAt: Date;

    @OneToOne(() => UsersEntity, user => user.credential, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
    userId: UsersEntity;
}
