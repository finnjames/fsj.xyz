---
title: Aerox 3 Daemon
date: 1656039074000
snippet: How to make a SteelSeries Aerox 3 Mouse Remember LED Colors
---

# {title}

## Background

I bought a new mouse to replace my old one and I had limited options. I wanted a wireless USB-C mouse that worked with both Bluetooth and 2.4GHz. I narrowed it down to the MX Master and the Aerox 3 Wireless, and a sale on the Aerox made the decision. I like the mouse a lot, I think it looks good and is nice to use, but it has one fatal flaw—it doesn't remember the LED colors on device memory.

This is frustrating because I like to have my computer setup as LED-free as possible, especially at night. Even more frustrating is that the mouse resets to rainbow RGB colors everytime it sleeps from inactivity, not just when it powers off! So since I didn't want to install SteelSeries' questionable device management software, I decided to make my own.

## The Daemon

<script src="https://gist.github.com/finnsjames/bbad3a92e8445cec66edaa2915d39a52.js"></script>

I have only tested this on macOS Monterey and with the 2.4GHz wireless connector, but it appears to be working with no caveats.

Use a shell script like this one that sets all of the mouse settings you want using `rivalcfg`. This example one just turns off all LEDs. Make sure that you specify where `rivalcfg` is located.

```bash
#!/bin/sh 

export PATH=/Library/Frameworks/Python.framework/Versions/3.10/bin

rivalcfg --top-color black
rivalcfg --middle-color black
rivalcfg --bottom-color black
rivalcfg -a black
```

Next, create a file at `~/Library/LaunchAgents/com.aerox.plist` with the following contents ([source](https://stackoverflow.com/a/12259762)).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC -//Apple Computer//DTD PLIST 1.0//EN http://www.apple.com/DTDs/PropertyList-1.0.dtd >
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.aerox.program</string>
    <key>ProgramArguments</key>
    <array>
    <string>/path/to/script.sh</string>
    </array>
    <key>LaunchEvents</key>
    <dict>
            <key>com.apple.iokit.matching</key>
            <dict>
                    <key>com.apple.device-attach</key>
                    <dict>
                            <key>idProduct</key>
                            <integer>1234</integer>
                            <key>idVendor</key>
                            <integer>1234</integer>
                            <key>IOProviderClass</key>
                            <string>IOUSBDevice</string>
                            <key>IOMatchLaunchStream</key>
                            <true/>
                    </dict>
            </dict>
    </dict>
</dict>
</plist>
```
Be sure to use the actual path to the shell script you wrote before! [This answer on StackOverflow](https://stackoverflow.com/a/49902760) explains how to get the correct values for the `idProduct` and `idVendor` fields using `System Information.app`.

Finally, launch the new daemon.

```bash
launchctl load /Library/LaunchDaemons/com.aerox.plist
```

The mouse should update its LED colors within a few seconds. In a classic feature-not-bug, this script will fire every 10 seconds as long as the mouse is plugged in, which is actually a good thing for our purposes because for some reason SteelSeries decided to make the memory clear on sleep as well as power off.

## Credits

I only got this working because of [rivalcfg](https://github.com/flozz/rivalcfg), a reverse-engineered SteelSeries config CLI and [this StackOverflow answer](https://stackoverflow.com/a/12259762) explaining how to write a systemd daemon that runs a script when a specific USB device is detected
