## Alias configuration

### Mac
add the following to the end of your `.zprofile`:
```
alias spade="cd ~../sprig/firmware/spade"
export PATH=../sprig/scripts/gardenshed:$PATH
alias gardenshed="python3 ../sprig/scripts/gardenshed/gardenshed.py"
alias gs="python3 ../sprig/scripts/gardenshed/gardenshed.py"
```

**replace the `../sprig/` directory with the proper directory to your sprig folder.**


### Ubuntu
add the following to the end of your `.bash-rc`:
```
alias spade="cd ~../sprig/firmware/spade"
export PATH=../sprig/scripts/gardenshed:$PATH
alias gardenshed="python3 ../sprig/scripts/gardenshed/gardenshed.py"
alias gs="python3 ../sprig/scripts/gardenshed/gardenshed.py"
```
**replace the `../sprig/` directory with the proper directory to your sprig folder.**
