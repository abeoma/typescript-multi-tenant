import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

// eslint-disable-next-line new-cap
@Entity({ database: "admin", name: "tenant" })
export class TenantModel {
  // eslint-disable-next-line new-cap
  @PrimaryColumn()
  id!: string;

  // eslint-disable-next-line new-cap
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  // eslint-disable-next-line new-cap
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}
