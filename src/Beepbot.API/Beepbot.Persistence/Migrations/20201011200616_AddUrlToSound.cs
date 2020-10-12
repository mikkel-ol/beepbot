using Microsoft.EntityFrameworkCore.Migrations;

namespace Beepbot.Persistence.Migrations
{
    public partial class AddUrlToSound : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Sounds",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Sounds");
        }
    }
}
