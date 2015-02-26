# bother

Command line application to test availability of services on OT discovery.

Usage:

To install on local machine:

```shell
npm install -g bother
```
To start bothering:

```shell
bother [discoveryServer] --service <servicename> --time <seconds>
```

The **discoveryServer** argument is mandatory. It is the discovery service URL to be hit by bother.
The **time** parameter is optional. If not specified, you will bother forever. Until of course you force the exit from keyboard.

