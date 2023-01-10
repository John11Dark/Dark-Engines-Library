-- declaer variables   

-- Global variables    
local password = ""
local lives = 0
local hints = 5

--buttons
local btnOne = workspace["Game Modles"]["Control buttons"]["keypad buttons"].buttonOne
local btnTwo = workspace["Game Modles"]["Control buttons"]["keypad buttons"].buttonTwo
local btnThree = workspace["Game Modles"]["Control buttons"]["keypad buttons"].buttonThree
local btnFour = workspace["Game Modles"]["Control buttons"]["keypad buttons"].buttonFour
local btnFive = workspace["Game Modles"]["Control buttons"]["keypad buttons"].buttonFive

-- buttons label 
local btnOneLabel  =  btnOne.SurfaceGui.TextLabel
local btnTwoLabel  =  btnTwo.SurfaceGui.TextLabel
local btnThreeLabel=  btnThree.SurfaceGui.TextLabel
local btnFourLabel =  btnFour.SurfaceGui.TextLabel
local btnFiveLabel =  btnFive.SurfaceGui.TextLabel


-- control buttons 
local resetBtn =  workspace["Game Modles"]["Control buttons"]["main buttons"].resetButton
local submitBtn = workspace["Game Modles"]["Control buttons"]["main buttons"].submitButton

-- Displays
local infoDisplayLabel =  workspace["Game Modles"].Screens.infoScreen.SurfaceGui.TextLabel
local hintsDisplayLabel = workspace["Game Modles"].Screens.hintsScreen.SurfaceGui.TextLabel  

-- gate 
local gate = game.Workspace.Gate



--Arraies 
local alphapticalList = {
	"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
}

local hintsList={
} 



--Functions

-- genrate a random password 
local function generateRandomPassword()
	local randomLength = Random.new():NextInteger(3,5)
	for i = 1, randomLength
	do
		local char = alphapticalList[Random.new():NextInteger(1, #alphapticalList)]
		password = password..char
	end
	hintsList = {
		--geting the passcode length 
		"Passcode's Length is "..#password, --A passcode's length

		--geting the first character of the passcode 
		"The first character of the passcode\n is ' "..password:sub(1, 1).." ' ",	--B The passcode's firts char

		--geting the first two character of the passcode 
		"The first two characters of the passcode \n is '"..password:sub(1, 2).." ' ",	--C The passcode's firts two chars

		--geting the last character of the passcode 
		"The last character of the passcode\nis '"..password:sub(-1).." ' ", --D The passcode's last char

		--geting the last two character of the passcode 
		"The last two characters of the passcode\nis '"..password:sub(-2).." ' ", --D The passcode's last two chars
	}  
	return password, hintsList
end


-- dispaly char when button clicked 
local function keyPad(object)		
	--print(object.Name.." has clicked" ) -- for testing purposes 
	local index = object:GetAttribute("index") -- get object's index to represent the character index in a list
	--print("Get index "..index) -- for testing purposes 

	local charToDispaly = alphapticalList[index] -- get the  character with it's index 
	--print("Char = "..charToDispaly) -- for testing purposes 

	object.SurfaceGui.TextLabel.Text = charToDispaly -- set the  object's label to the created character

	-- if index is equal to the list maximum then reset it to zero  
	if index == #alphapticalList then
		index = 0
	end

	-- increase the index on each click 
	index = index + 1

	-- update the obect attribute
	object:SetAttribute("index", index)
	--print("Set Index = "..index) -- for testing purposes 
end


-- reset all objects to thier default state 
local function resetState(deactivate, Toggled)
	if Toggled == true then
		-- print("reset button clicked") -- for testing purposes 
	end 
	btnOneLabel.Text= ""
	btnTwoLabel.Text= ""
	btnThreeLabel.Text= ""
	btnFourLabel.Text= ""
	btnFiveLabel.Text= ""
	btnOne:SetAttribute("index", 1)
	btnTwo:SetAttribute("index", 1)
	btnThree:SetAttribute("index", 1)
	btnFour:SetAttribute("index", 1)
	btnFive:SetAttribute("index", 1)

	--btnOne.ClickDetector.Archivable = deactivate
	--btnTwo.ClickDetector.Archivable = deactivate
	--btnThree.ClickDetector.Archivable = deactivate
	--btnFour.ClickDetector.Archivable = deactivate
	--btnFive.ClickDetector.Archivable = deactivate
	--resetState.ClickDetector.Archivable = deactivate
	--submitBtn.ClickDetector.Archivable = deactivate
	-- for some reason the above code is not disabling the buttons click detector 

	-- so I used the below code and I changed deactivate from boolean  (false/true) to integer (0/ 32)   
	btnOne.ClickDetector.MaxActivationDistance = deactivate
	btnTwo.ClickDetector.MaxActivationDistance = deactivate
	btnThree.ClickDetector.MaxActivationDistance = deactivate
	btnFour.ClickDetector.MaxActivationDistance = deactivate
	btnFive.ClickDetector.MaxActivationDistance = deactivate
	submitBtn.ClickDetector.MaxActivationDistance = deactivate
	resetBtn.ClickDetector.MaxActivationDistance = deactivate

end 


local function openGate()
	print("gate will open in 2 secodns")  -- for testing purposes
	wait(1)
	local explosion  = Instance.new("Explosion")
	explosion.Parent = game.Workspace
	explosion.Position = gate.PartToExplode.Position
	wait(1)
	gate:Destroy()
end


local function submitPassCode()

	print("submit button clicked") -- for testing purposes 
	-- get user's Input 
	local userInput = btnOneLabel.Text..btnTwoLabel.Text..btnThreeLabel.Text..btnFourLabel.Text..btnFiveLabel.Text
	print("user's input is "..userInput) -- for testing purposes 

	if (userInput == "") or (userInput == " " )then 	-- check if user's input is empty --this is an extraa functionality   

		infoDisplayLabel.Text = "Please input a value"



	elseif userInput ~= password then -- if user's input not equal the the password


		if lives < 6 then -- check number of lives if it's not greater than six (6) then =>

			lives = (lives + 1) -- increment lives by one 
			infoDisplayLabel.Text = "Incorrect \nPasscode" 	-- display that the inputed passcode is incoreect 

			hintsDisplayLabel.Text = ""-- empty/ reset hints display 

			wait(2) 			-- wait two seconds 

			resetState(32, false) -- reset buttons status to defaults (empty) 

			infoDisplayLabel.Text = "incorrect \ntries: "..lives -- display the number of incorrect tries 

			if #hintsList ~= 0 then -- if hints not equal to zero get a random hint from hints list

				local index = Random.new():NextInteger(1, #hintsList) -- get a random index between 1 and hints Length 
				local hintToDisplay  = hintsList[index]  -- store the index in a variable   
				hintsDisplayLabel.Text = hintToDisplay -- display hint on hints display 
				table.remove(hintsList, index)  -- remove index so it does not appear again 

			end


		elseif lives == 6  then -- if lives equal to six (6) then =>

			infoDisplayLabel.Text = "you lost \n the game "  -- display you lost on info screen

			hintsDisplayLabel.Text = "the passcode \n was "..password -- display the  genrated passcode on hints screen

			resetState(0, false)-- deactivate and reset buttons 


		end


	elseif userInput == password then -- if password is correct 

		infoDisplayLabel.Text = "Coreect password" -- display correct password on info screen 
		hintsDisplayLabel.Text = ""-- empty/ reset hints display 

		for i = 1, 10  do -- blink text color on info screen 
			infoDisplayLabel.TextColor3 = Color3.fromRGB(0, 170, 0)
			--print("color changed 1") -- for testing purposes 
			wait(0.5)
			infoDisplayLabel.TextColor3 = Color3.fromRGB(154, 12, 12)
			wait(0.5)
			--print("color changed  2") -- for testing purposes 
		end

		openGate() -- open the gate 

		resetState(false, false) -- deactivate all buttons 
	end

end


local function onLoad()
	print("Game loaded without issues")  -- for testing purposes
	resetState(32, false)
	infoDisplayLabel.Text = "Welcome" -- set section C display  
	hintsDisplayLabel.Text = "" 	-- set section b display to empty 
	generateRandomPassword()  -- generate a new password and hints list on start 
	-- print(hintsList) -- for testing purposes 
	print(password) -- for testing purposes 

end


-- Main code starts here 

-- set everything to defaults  when game starts 
onLoad()

-- when button click connect it to its function
-- when key pad buttons clicked display a character on text label  
btnOne.ClickDetector.MouseClick:Connect(function()
	keyPad(btnOne)
end)

btnTwo.ClickDetector.MouseClick:Connect(function()
	keyPad(btnTwo)
end)

btnThree.ClickDetector.MouseClick:Connect(function()
	keyPad(btnThree)
end)

btnFour.ClickDetector.MouseClick:Connect(function()
	keyPad(btnFour)
end)

btnFive.ClickDetector.MouseClick:Connect(function()
	keyPad(btnFive)
end)


-- when reset button clicked reset all labels to  thier default state
resetBtn.ClickDetector.MouseClick:connect(function()
	resetState(32, true)
end)-- when submit button clicked submit the values in the keypad buttons 


submitBtn.ClickDetector.MouseClick:Connect(submitPassCode)



