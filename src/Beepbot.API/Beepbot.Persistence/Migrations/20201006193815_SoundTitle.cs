using Microsoft.EntityFrameworkCore.Migrations;

namespace Beepbot.Persistence.Migrations
{
    public partial class SoundTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Sounds",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Sounds");
        }
    }
}
