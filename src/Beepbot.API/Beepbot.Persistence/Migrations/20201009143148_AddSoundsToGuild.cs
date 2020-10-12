using Microsoft.EntityFrameworkCore.Migrations;

namespace Beepbot.Persistence.Migrations
{
    public partial class AddSoundsToGuild : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "GuildId",
                table: "Sounds",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Sounds_GuildId",
                table: "Sounds",
                column: "GuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sounds_Guilds_GuildId",
                table: "Sounds",
                column: "GuildId",
                principalTable: "Guilds",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sounds_Guilds_GuildId",
                table: "Sounds");

            migrationBuilder.DropIndex(
                name: "IX_Sounds_GuildId",
                table: "Sounds");

            migrationBuilder.DropColumn(
                name: "GuildId",
                table: "Sounds");
        }
    }
}
