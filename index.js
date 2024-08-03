#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import Table from "cli-table3";
import { colord } from "colord";

program
    .option("--hex <hex>")
    .option("--rgb <rgb>")
    .option("--hsl <hsl>")
    .action((options) => {
        // get color value
        let { hex, rgb, hsl } = options;
        if (![hex, rgb, hsl].some((option) => option)) {
            program.error(`${chalk.red("x")} error: require at least one option: --hex --rgb --hsl`);
        }
        if (hex) {
            if (hex[1] != "#") hex = `#${hex}`;
            if (!colord(hex).isValid()) {
                program.error(`${chalk.red("x")} error: Hex ${hex} is not valid`);
            }
            rgb = colord(hex).toRgbString();
            hsl = colord(hex).toHslString();
        } else if (rgb) {
            const [r, g, b] = rgb.split(" ");
            rgb = `rgb(${r}, ${g}, ${b})`;
            if (!colord(rgb).isValid()) {
                program.error(`${chalk.red("x")} error: Rgb ${rgb} is not valid`);
            }
            hex = colord(rgb).toHex();
            hsl = colord(hex).toHslString();
        } else if (hsl) {
            const [h, s, l] = hsl.split(" ");
            hsl = `hsl(${h}deg, ${s}%, ${l}%)`;
            if (!colord(hsl).isValid()) {
                program.error(`${chalk.red("x")} error: ${hsl} is not valid`);
            }
            hex = colord(hsl).toHex();
            rgb = colord(hex).toRgbString();
        }

        // format color value
        rgb = rgb.match(/\d+/g).join(", ");
        hsl = hsl.match(/\d+/g).join(", ");

        // render table
        const table = new Table({
            head: [],
            colWidths: [12, 24],
            chars: { top: chalk.hex(hex)("─"), "top-right": chalk.hex(hex)("┐"), right: chalk.hex(hex)("│"), "right-mid": chalk.hex(hex)("│"), "bottom-right": chalk.hex(hex)("┘"), bottom: chalk.hex(hex)("─"), "bottom-mid": chalk.hex(hex)("─"), "bottom-left": chalk.hex(hex)("└"), left: chalk.hex(hex)("│"), "left-mid": chalk.hex(hex)("│"), "top-left": chalk.hex(hex)("┌"), "top-mid": chalk.hex(hex)("─"), mid: "─", "mid-mid": "─", middle: " " },
            style: { "padding-left": 2, "padding-right": 2 },
        });
        table.push([chalk.bold("Hex"), hex], [chalk.bold("RGB"), rgb], [chalk.bold("HSL"), hsl]);
        console.log(`Color spaces of ${chalk.hex(hex)(hex)}`);
        console.log(table.toString());
    });

program.parse();
